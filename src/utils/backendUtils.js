/**
 * Fetch a challenge from the backend
 */
export async function getChallenge(verifier, accountAddress) {
  const response = await fetch(
    `${verifier}/challenge?address=${accountAddress}`,
    { method: "get" }
  );
  console.log(response);
  const body = await response.json();
  return body.challenge;
}

/**
 *  Authorize with the backend, and get a auth token.
 */
export async function authorize(verifier, challenge, proof, statement) {
  const response = await fetch(`${verifier}/prove`, {
    method: "post",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify({ challenge, proof, statement }),
  });
  if (!response.ok) {
    throw new Error("Unable to authorize");
  }
  const body = await response.json();
  if (body) {
    return body;
  }
  throw new Error("Unable to authorize");
}
