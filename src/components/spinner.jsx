import './spinner.css';

const Spinner = () => (
  <div className="spinner">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i}></div>
    ))}
  </div>
);

export default Spinner;
