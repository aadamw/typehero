import { SubmissionOverview } from '../../../@left/submissions/_components/overview';

interface SubmissionPageProps {
  params: { submissionId: string };
}

export default function SubmissionPage({ params }: SubmissionPageProps) {
  return <SubmissionOverview submissionId={params.submissionId} />;
}
