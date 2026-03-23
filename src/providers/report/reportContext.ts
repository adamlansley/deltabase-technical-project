import { createContext } from 'react';

type ReportContextMembers = {};

export const ReportContext = createContext<ReportContextMembers | null>(null);
