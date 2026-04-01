import { useState, useEffect } from 'react';

const EMPTY = { courseName: '', description: '' };

export default function CourseModal({ mode, course, onSave, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course) setForm({ courseName: course.courseName || '', description: course.description || '' });
    else setForm(EMPTY);
  }, [course]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave(form);
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
          <div className="form-group">
            <label>Course Name</label>
            <input name="courseName" value={form.courseName} onChange={handleChange} disabled={isView} required placeholder="e.g. Advanced Mathematics" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} disabled={isView} rows={4} placeholder="Describe the course content..." />
          </div>
          {isView && course?.supervisorId && (
            <div className="form-group">
              <label>Supervisor ID</label>
              <input value={course.supervisorId} disabled />
            </div>
          )}
          {isView && course?.createdAt && (
            <div className="form-row">
              <div className="form-group">
                <label>Created</label>
                <input value={new Date(course.createdAt).toLocaleDateString()} disabled />
              </div>
              <div className="form-group">
                <label>Updated</label>
                <input value={new Date(course.updatedAt).toLocaleDateString()} disabled />
              </div>
            </div>
          )}
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
