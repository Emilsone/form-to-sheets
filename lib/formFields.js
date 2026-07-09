export const FORM_SECTIONS = [
    {
        id: 'personal',
        title: 'Personal Information',
        fields: [
            {
                id: 'fullName',
                label: 'Full Name',
                type: 'text',
                placeholder: 'John Doe',
                required: true,
                half: false,
            },
            {
                id: 'email',
                label: 'Email Address',
                type: 'email',
                placeholder: 'john@example.com',
                required: true,
                half: true,
            },
            {
                id: 'phone',
                label: 'Phone Number',
                type: 'tel',
                placeholder: '+234 800 000 0000',
                required: false,
                half: true,
            },
        ],
    },
    {
        id: 'details',
        title: 'Additional Details',
        fields: [
            {
                id: 'source',
                label: 'How did you hear about us?',
                type: 'radio',
                required: false,
                half: false,
                options: [
                    { value: 'social_media', label: 'Social Media' },
                    { value: 'friend', label: 'Friend or Colleague' },
                    { value: 'search', label: 'Google Search' },
                    { value: 'other', label: 'Other' },
                ],
            },
            {
                id: 'message',
                label: 'Message (optional)',
                type: 'textarea',
                placeholder: 'Anything you want us to know...',
                required: false,
                half: false,
                rows: 4,
            },
        ],
    },
];
export const ALL_FIELD_IDS = [
    'submittedAt',
    ...FORM_SECTIONS.flatMap((s) => s.fields.map((f) => f.id)),
];