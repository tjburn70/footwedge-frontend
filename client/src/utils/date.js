import { format } from 'date-fns';

const formatDate = (date, formatStr) =>
    format(new Date(date), formatStr);

export { formatDate };
