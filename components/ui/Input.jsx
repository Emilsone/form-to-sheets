import clsx from 'clsx';

export default function Input({
    label, id, type = 'text', placeholder,
    register, error, required, rows, options, half,
}) {
    const baseClass = clsx(
        'w-full h-14 border rounded-xl px-5 text-lg font-medium text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 bg-white',
        error
            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
            : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
    );

    return (
        <div className={half ? 'w-full md:w-1/2' : 'w-full'}>
            {label && (
                <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-800">
                    {label}{required && <span className="text-red-500"> *</span>}
                </label>
            )}

            {type === 'textarea' ? (
                <textarea
                    id={id}
                    placeholder={placeholder}
                    rows={rows || 4}
                    className={baseClass}
                    {...register(id, { required })}
                />
            ) : type === 'radio' ? (
                <div className="flex flex-col gap-3">
                    {options?.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                            <input
                                type="radio"
                                value={opt.value}
                                className="h-5 w-5 border-gray-300 text-blue-600 focus:ring-blue-500"
                                {...register(id, { required })}
                            />
                            {opt.label}
                        </label>
                    ))}
                </div>
            ) : (
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className={baseClass}
                    {...register(id, { required })}
                />
            )}
            {error && <p className="mt-2 text-sm text-red-500">{error.message}</p>}
        </div>
    );
}