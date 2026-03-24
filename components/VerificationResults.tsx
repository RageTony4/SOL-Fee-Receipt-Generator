import React from 'react';
import type { VerificationResult } from '../types.ts';
import { CheckCircleIcon, XCircleIcon, InfoIcon } from './Icons.tsx';

interface VerificationResultsProps {
    result: VerificationResult | null;
    error: string | null;
}

const VerificationItem: React.FC<{
    label: string;
    check?: { verified: boolean; feedback: string };
}> = ({ label, check }) => {
    if (!check) return null;
    const Icon = check.verified ? CheckCircleIcon : XCircleIcon;
    const color = check.verified ? 'text-green-400' : 'text-red-400';
    return (
        <li className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg">
            <Icon className={`w-6 h-6 flex-shrink-0 mt-0.5 ${color}`} />
            <div>
                <p className={`font-semibold ${color}`}>{label}</p>
                <p className="text-sm text-gray-300">{check.feedback}</p>
            </div>
        </li>
    );
};

const VerificationResults: React.FC<VerificationResultsProps> = ({ result, error }) => {
    if (error) return (
        <div className="border border-red-500/50 bg-red-900/20 text-red-300 p-4 rounded-lg flex items-center gap-3">
            <XCircleIcon className="w-6 h-6" />
            <p>{error}</p>
        </div>
    );
    if (!result) return null;
    return (
        <div className="border border-gray-700 p-4 rounded-lg bg-gray-800 animate-fade-in">
            <h3 className="text-lg font-bold mb-3 text-center text-indigo-400">AI Verification Results</h3>
            <ul className="space-y-2">
                <VerificationItem label="Student Name Present" check={result.studentNameCheck} />
                <VerificationItem label="University Info Present" check={result.universityInfoCheck} />
                <VerificationItem label="Date is Recent" check={result.dateCheck} />
            </ul>
             <div className="mt-4 text-xs text-gray-500 text-center flex items-center justify-center gap-2">
                <InfoIcon className="w-4 h-4" />
                <span>AI results may vary. Please review manually.</span>
            </div>
        </div>
    );
};

export default VerificationResults;