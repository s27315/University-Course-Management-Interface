import { useState, useEffect, useCallback } from 'react';
import { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } from './api';
import CourseModal from './CourseModal';

export default function Dashboard({ onLogout }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null); // { mode: 'create'|'edit'|'view', course: null|{} }
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState('');

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourses(Array.isArray(data) ? data : data.courses || data.data || []);
    } catch {
      showToast('Failed to load courses.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const handleView = async (id) => {
    try {
      const data = await getCourseById(id);
      setModal({ mode: 'view', course: data.course || data });
    } catch {
      showToast('Failed to load course details.', 'error');
    }
  };

  const handleSave = async (form) => {
    try {
      if (modal.mode === 'create') {
        await createCourse(form);
        showToast('Course created successfully!');
      } else {
        await updateCourse(modal.course._id || modal.course.id, form);
        showToast('Course updated successfully!');
      }
      setModal(null);
      fetchCourses();
    } catch {
      showToast('Operation failed. Please try again.', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCourse(deleteTarget._id || deleteTarget.id);
      showToast('Course deleted successfully!');
      setDeleteTarget(null);
      fetchCourses();
    } catch {
      showToast('Failed to delete course.', 'error');
    }
  };

  const filtered = courses.filter((c) =>
    [c.title, c.code, c.instructor].some((f) => f?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="dashboard">
      {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}

      <header className="topbar">
        <div className="topbar-left">
          <span className="logo">🎓</span>
          <div>
            <h1>University Portal</h1>
            <span>Course Management Dashboard</span>
          </div>
        </div>
        <button className="btn btn-outline" onClick={onLogout}>Sign Out</button>
      </header>

      <main className="main-content">
        <div className="page-header">
          <div>
            <h2>Course Catalog</h2>
            <p>{courses.length} course{courses.length !== 1 ? 's' : ''} available</p>
          </div>
          <button className="btn btn-primary" onClick={() => setModal({ mode: 'create', course: null })}>
            + Add Course
          </button>
        </div>

        <div className="toolbar">
          <input
            className="search-input"
            placeholder="Search by title, code or instructor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner large" />
            <p>Loading courses...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <span>📚</span>
            <p>{search ? 'No courses match your search.' : 'No courses yet. Add your first course!'}</p>
          </div>
        ) : (
          <div className="course-grid">
            {filtered.map((course) => (
              <div key={course._id || course.id} className="course-card">
                <div className="course-card-header">
                  <span className="course-code">{course.code || 'N/A'}</span>
                  <span className="course-credits">{course.credits ? `${course.credits} cr` : ''}</span>
                </div>
                <h3 className="course-title">{course.title}</h3>
                {course.instructor && <p className="course-instructor">👤 {course.instructor}</p>}
                {course.description && <p className="course-desc">{course.description}</p>}
                <div className="course-actions">
                  <button className="btn btn-sm btn-ghost" onClick={() => handleView(course._id || course.id)}>View</button>
                  <button className="btn btn-sm btn-secondary" onClick={() => setModal({ mode: 'edit', course })}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => setDeleteTarget(course)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {modal && (
        <CourseModal
          mode={modal.mode}
          course={modal.course}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {deleteTarget && (
        <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🗑️ Delete Course</h2>
              <button className="modal-close" onClick={() => setDeleteTarget(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{deleteTarget.title}</strong>? This action cannot be undone.</p>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setDeleteTarget(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
