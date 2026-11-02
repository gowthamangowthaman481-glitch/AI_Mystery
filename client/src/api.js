async function request(path, options = {}) {
  const response = await fetch(`/api/v1${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...options.headers } });
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload?.success) throw new Error(payload?.error?.message || 'Could not reach the investigation service.');
  return payload.data;
}
export const api = {
  create: (scenario, difficulty) => request('/investigations', { method: 'POST', body: JSON.stringify({ scenario, difficulty }) }),
  get: id => request(`/investigations/${id}`),
  answer: (id, selectedSuspectId) => request(`/investigations/${id}/answer`, { method: 'POST', body: JSON.stringify({ selectedSuspectId }) }),
  solution: id => request(`/investigations/${id}/solution`)
};
