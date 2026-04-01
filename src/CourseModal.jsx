import { useState, useEffect } from 'react';

const EMPTY = { title: '', code: '', description: '', credits: '', instructor: '' };

export default function CourseModal({ mode, course, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course) setForm({ ...EMPTY, ...course });
    else setForm(EMPTY);
  }, [course]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave({ ...form, credits: Number(form.credits) });
    setLoading(false);
  };

  const isView = mode === 'view';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {mode === 'create' ? '➕ Add New Course' : mode === 'edit' ? '✏️ Edit Course' : '📋 Course Details'}
          </h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label>Course Title</label>
              <input name="title" value={form.title} onChange={handleChange} disabled={isView} required />
            </div>
            <div className="form-group">
              <label>Course Code</label>
              <input name="code" value={form.code} onChange={handleChange} disabled={isView} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Instructor</label>
              <input name="instructor" value={form.instructor} onChange={handleChange} disabled={isView} />
            </div>
            <div className="form-group">
              <label>Credits</label>
              <input name="credits" type="number" min="1" max="10" value={form.credits} onChange={handleChange} disabled={isView} />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} disabled={isView} rows={3} />
          </div>
          {!isView && (
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <span className="spinner" /> : mode === 'create' ? 'Create Course' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
