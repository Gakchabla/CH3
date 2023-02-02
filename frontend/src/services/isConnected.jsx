export default function isConnected(response) {
  if (response.status === 401) {
    return false;
  }
  return true;
}
