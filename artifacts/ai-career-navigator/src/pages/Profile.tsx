import { useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight, Check, Plus, RotateCcw, X } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PageIntro, Panel } from '../components/Shared';
import { demoProfile, interestOptions, skillOptions, type Profile } from '../data/careers';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { useNavigator } from '../state/NavigatorContext';

const profileSchema = z.object({
  education: z.string().trim().min(1, 'Add your education or current learning path.'),
  skills: z.array(z.string()).min(1, 'Choose or add at least one skill.'),
  experience: z.string(),
  projects: z.string(),
  interests: z.array(z.string()).min(1, 'Choose at least one career interest.'),
});

export default function ProfilePage() {
  const { profile, setProfile, profileIsSample } = useNavigator();
  const [, setLocation] = useLocation();
  const form = useForm<Profile>({ resolver: zodResolver(profileSchema), defaultValues: profile });
  const [draftIsSample, setDraftIsSample] = useState(profileIsSample);
  const [skillEntry, setSkillEntry] = useState('');
  const [saved, setSaved] = useState(false);
  const analyzeAfterSave = useRef(false);
  const skills = form.watch('skills');
  const interests = form.watch('interests');
  const toggleSkill = (skill: string) => {
    const current = form.getValues('skills');
    form.setValue('skills', current.includes(skill) ? current.filter((item) => item !== skill) : [...current, skill], { shouldDirty: true, shouldValidate: true });
    setDraftIsSample(false);
  };
  const toggleInterest = (interest: string) => {
    const current = form.getValues('interests');
    form.setValue('interests', current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest], { shouldDirty: true, shouldValidate: true });
    setDraftIsSample(false);
  };
  const addSkill = (value: string) => {
    const normalized = value.trim().toLowerCase();
    const current = form.getValues('skills');
    if (normalized && !current.includes(normalized)) {
      form.setValue('skills', [...current, normalized], { shouldDirty: true, shouldValidate: true });
      setDraftIsSample(false);
    }
    setSkillEntry('');
  };
  const onSubmit = form.handleSubmit((data) => {
    setSaved(false);
    setProfile(data, draftIsSample);
    setSaved(true);
    if (analyzeAfterSave.current) setLocation('/careers');
  });
  const loadDemo = () => {
    form.reset({ ...demoProfile, skills: [...demoProfile.skills], interests: [...demoProfile.interests] });
    setDraftIsSample(true);
    setSaved(false);
  };
  return <div className="page">
    <PageIntro eyebrow="01 / Your profile" title="Start with the evidence you have.">A good match begins with your context, not a job title. Share only what is useful. {profileIsSample ? 'The profile currently shown is a fictional sample for demonstration; replace it with your details before interpreting the results.' : 'Your profile is held in this browser session only; it is not sent to a database.'}</PageIntro>
    <Panel className="panel-pad">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap', marginBottom: 22 }}>
        <div><h2 className="section-title">Your background</h2><p className="field-hint" style={{ margin: '6px 0 0' }}>Required for analysis: education, at least one skill, and one interest.</p></div>
        <button className="button button-secondary button-small" onClick={loadDemo} type="button" data-testid="button-load-demo-profile"><RotateCcw size={13} />Fill synthetic demo profile</button>
      </div>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="form-grid">
            <FormField control={form.control} name="education" render={({ field }) => <FormItem className="field form-wide"><FormLabel>Education or current learning path <span aria-hidden="true">*</span></FormLabel><FormControl><input {...field} className="control" onChange={(event) => { field.onChange(event); setDraftIsSample(false); }} placeholder="e.g. diploma, degree, apprenticeship, self-directed learning" data-testid="input-education" aria-required="true" /></FormControl><span className="field-hint">Use your own words. No institution name is required.</span><FormMessage /></FormItem>} />
            <FormField control={form.control} name="skills" render={({ fieldState }) => <FormItem className="field form-wide"><span className="label">Skills you can use today <span aria-hidden="true">*</span></span><span className="field-hint">Choose from the suggestions or add a skill in your own words.</span>
              <div className="chip-row" role="group" aria-label="Suggested skills">{skillOptions.map((skill) => <button type="button" className={`chip chip-toggle ${skills.includes(skill) ? 'chip-selected' : ''}`} key={skill} onClick={() => toggleSkill(skill)} aria-pressed={skills.includes(skill)} data-testid={`button-skill-${skill.replaceAll(' ', '-')}`}>{skills.includes(skill) && <Check size={11} />}{skill}</button>)}</div>
              <div style={{ display: 'flex', gap: 8 }}><input className="control" value={skillEntry} onChange={(event) => setSkillEntry(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); addSkill(skillEntry); } }} placeholder="Add another skill" aria-label="Add a custom skill" data-testid="input-custom-skill" /><button className="button button-secondary button-small" type="button" onClick={() => addSkill(skillEntry)} data-testid="button-add-skill"><Plus size={14} />Add</button></div>
              {skills.length > 0 && <div className="chip-row" aria-label="Selected skills">{skills.map((skill) => <span className="chip chip-selected" key={skill}>{skill}<button type="button" aria-label={`Remove ${skill}`} onClick={() => { form.setValue('skills', form.getValues('skills').filter((item) => item !== skill), { shouldDirty: true, shouldValidate: true }); setDraftIsSample(false); }} data-testid={`button-remove-skill-${skill.replaceAll(' ', '-')}`}><X size={11} /></button></span>)}</div>}
              {fieldState.error && <FormMessage />}</FormItem>} />
            <FormField control={form.control} name="experience" render={({ field }) => <FormItem className="field form-wide"><FormLabel>Experience</FormLabel><FormControl><textarea {...field} className="control" onChange={(event) => { field.onChange(event); setDraftIsSample(false); }} placeholder="Paid work, volunteering, caregiving, clubs, informal responsibilities…" data-testid="input-experience" /></FormControl><span className="field-hint">Include non-traditional experience if it matters to you.</span></FormItem>} />
            <FormField control={form.control} name="projects" render={({ field }) => <FormItem className="field form-wide"><FormLabel>Projects and examples</FormLabel><FormControl><textarea {...field} className="control" onChange={(event) => { field.onChange(event); setDraftIsSample(false); }} placeholder="A project, task, or moment where you practiced a skill…" data-testid="input-projects" /></FormControl></FormItem>} />
            <FormField control={form.control} name="interests" render={({ fieldState }) => <FormItem className="field form-wide"><span className="label">Career interests <span aria-hidden="true">*</span></span><span className="field-hint">Choose any that feel worth exploring. These are prompts, not a commitment.</span><div className="chip-row" role="group" aria-label="Career interest options">{interestOptions.map((interest) => <button type="button" className={`chip chip-toggle ${interests.includes(interest) ? 'chip-selected' : ''}`} key={interest} onClick={() => toggleInterest(interest)} aria-pressed={interests.includes(interest)} data-testid={`button-interest-${interest.replaceAll(' ', '-')}`}>{interests.includes(interest) && <Check size={11} />}{interest}</button>)}</div>{fieldState.error && <FormMessage />}</FormItem>} />
          </div>
          {form.formState.isSubmitted && !form.formState.isValid && <div className="callout" role="alert" style={{ marginTop: 20 }} data-testid="status-profile-errors"><strong>Before analysis, add a little more.</strong> Complete the required fields marked above.</div>}
          {saved && <div className="status-line" role="status" style={{ marginTop: 18 }} data-testid="status-profile-saved"><span className="status-dot ready" />Profile updated in this browser session.</div>}
          <hr className="divider" />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="button button-secondary" onClick={() => { analyzeAfterSave.current = false; }} type="submit" data-testid="button-save-profile">Save profile</button>
            <button className="button button-primary" onClick={() => { analyzeAfterSave.current = true; }} type="submit" data-testid="button-analyze-profile">Save & compare careers <ArrowRight size={15} /></button>
            <Link href="/" className="button button-quiet" data-testid="link-profile-dashboard">Back to dashboard</Link>
          </div>
        </form>
      </Form>
    </Panel>
  </div>;
}
