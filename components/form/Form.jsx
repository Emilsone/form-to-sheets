import { useForm } from 'react-hook-form';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FORM_SECTIONS } from '../../lib/formFields';
import { submitToSheets } from '../../lib/submitToSheets';
import Input from '../ui/Input';

export default function Form() {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit' });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await submitToSheets(data);
            setSubmitted(true);
        } catch (err) {
            toast.error(err.message || 'Submission failed.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="max-w-xl mx-auto text-center py-14 px-6 bg-white border border-green-100 rounded-2xl shadow-sm">
                <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100">
                    <span className="text-6xl">🎉</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                    Submission Successful!
                </h2>
                <p className="text-gray-600 mt-2">
                    Your details have been securely synced to our system.
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-10"
        >
            {FORM_SECTIONS.map((section) => (
                <div key={section.id} className="space-y-5">
                    <div className="border-b border-gray-200 pb-3">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {section.title}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {section.fields.map((field) => (
                            <Input
                                key={field.id}
                                {...field}
                                error={errors[field.id]}
                                register={register}
                            />
                        ))}
                    </div>
                </div>
            ))}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
        </form>
    );
}