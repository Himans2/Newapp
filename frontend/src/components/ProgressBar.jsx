const ProgressBar = ({ value }) => {
  return (
    <div className="w-full rounded-full bg-slate-200 h-3">
      <div className="bg-blue-500 h-3 rounded-full transition-all" style={{ width: `${value}%` }} />
    </div>
  );
};

export default ProgressBar;
