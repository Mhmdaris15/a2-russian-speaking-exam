import { NavLink } from 'react-router';
import { useAppStore } from '../stores/useAppStore';

const links = [
  { to: '/', label: 'Главная', icon: '🏠' },
  { to: '/presentation', label: 'Презентация', icon: '🎤' },
  { to: '/questions', label: 'Вопросы', icon: '❓' },
  { to: '/situations', label: 'Ситуации', icon: '🎭' },
  { to: '/flashcards', label: 'Карточки', icon: '🃏' },
  { to: '/reference', label: 'Справочник', icon: '📖' },
];

export function Navbar() {
  const { darkMode, toggleDarkMode } = useAppStore();

  return (
    <nav className="glass sticky top-0 z-50" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <NavLink to="/" className="font-semibold text-base tracking-tight" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>
          A2 Speaking
        </NavLink>

        <div className="flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `btn btn-ghost text-xs sm:text-sm px-2 sm:px-3 py-1.5 ${isActive ? 'font-semibold' : ''}`
              }
              style={({ isActive }) => ({
                background: isActive ? 'var(--color-accent-soft)' : undefined,
                color: isActive ? 'var(--color-accent)' : undefined,
              })}
            >
              <span className="hidden sm:inline">{l.icon}</span>
              <span className="hidden md:inline ml-1">{l.label}</span>
              <span className="md:hidden">{l.icon}</span>
            </NavLink>
          ))}

          <button
            onClick={toggleDarkMode}
            className="btn btn-ghost text-lg px-2 py-1.5 ml-1"
            title="Toggle dark mode (D)"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}
