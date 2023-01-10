import { Link } from 'react-router-dom';
import style from './Button.module.scss';

export default function Button({
  children,
  type,
  disabled,
  path,
  onClick,
  reverse,
}) {
  return type === 'link' ? (
    <div className={style.link}>
      <Link to={path}>{children}</Link>
    </div>
  ) : (
    <button
      type={type}
      disabled={disabled}
      className={reverse ? style.reverse : style.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
