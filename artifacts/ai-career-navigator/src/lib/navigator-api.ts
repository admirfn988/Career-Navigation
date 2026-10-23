import type { CareerState, CareerStateInput } from '@workspace/api-client-react';

const stateUrl = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/api/career/state`;

export class NavigatorApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'NavigatorApiError';
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isProfile(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return (
    typeof value.education === 'string' &&
    Array.isArray(value.skills) &&
    value.skills.every((item) => typeof item === 'string') &&
    typeof value.experience === 'string' &&
    typeof value.projects === 'string' &&
    Array.isArray(value.interests) &&
    value.interests.every((item) => typeof item === 'string')
  );
}

function parseCareerState(value: unknown): CareerState {
  if (
    !isRecord(value) ||
    !(value.profile === null || isProfile(value.profile)) ||
    typeof value.profileIsSample !== 'boolean' ||
    !(value.selectedCareerId === null || typeof value.selectedCareerId === 'string') ||
    !(value.scenario === 'moderate' || value.scenario === 'fast') ||
    !(value.updatedAt === null || typeof value.updatedAt === 'string')
  ) {
    throw new NavigatorApiError('The Career API returned an invalid state response.', 502);
  }
  return value as unknown as CareerState;
}

async function sendStateRequest(
  method: 'GET' | 'PUT',
  body?: CareerStateInput,
): Promise<CareerState> {
  let response: Response;
  try {
    response = await fetch(stateUrl, {
      method,
      credentials: 'same-origin',
      headers: body ? { 'Content-Type': 'application/json', Accept: 'application/json' } : { Accept: 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new NavigatorApiError('The Flask Career API could not be reached.', 0);
  }

  const result: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      isRecord(result) && typeof result.message === 'string'
        ? result.message
        : `Career API request failed with HTTP ${response.status}.`;
    throw new NavigatorApiError(message, response.status);
  }
  return parseCareerState(result);
}

export function loadNavigatorState(): Promise<CareerState> {
  return sendStateRequest('GET');
}

export function saveNavigatorState(state: CareerStateInput): Promise<CareerState> {
  return sendStateRequest('PUT', state);
}
