export default function FormField({ label, error, hint, required, children, id }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-primary">
          {label} {required && <span className="text-accent">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  )
}
