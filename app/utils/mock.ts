// app/utils/mock.ts
export async function getMockStats() {
  await new Promise((r) => setTimeout(r, 80));
  return { activeBids: 24, clientResponses: 8, projectsInProgress: 12, autoFollowUps: 16 };
}

export async function getMockStatuses() {
  await new Promise((r) => setTimeout(r, 60));
  return [
    { name: 'Gemini AI', percent: 78, status: 'ok' },
    { name: 'ChatGPT', percent: 45, status: 'warn' },
    { name: 'Freelancer API', percent: 62, status: 'ok' },
    { name: 'Upwork API', percent: 54, status: 'warn' },
  ];
}

export async function getMockActivities() {
  await new Promise((r) => setTimeout(r, 40));
  return [
    { id: '1', title: 'Proposal sent to Alice — $400', time: '2m ago' },
    { id: '2', title: 'New message from client (Fiverr)', time: '10m ago' },
    { id: '3', title: 'Auto
