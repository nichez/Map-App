/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = "http://localhost:5000";

export const fetchImageObjects = async (imageId: number) => {
  const response = await fetch(`${BASE_URL}/images/${imageId}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch image objects, status: ${response.status}`
    );
  }
  const image = await response.json();
  return image.objects;
};

export const saveObject = async (imageId: number, newObject: any) => {
  const response = await fetch(`${BASE_URL}/images/${imageId}`);
  const image = await response.json();

  const updatedObjects = [...image.objects, newObject];

  const updateResponse = await fetch(`${BASE_URL}/images/${imageId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...image, objects: updatedObjects }),
  });

  return updateResponse.json();
};

export const updateObject = async (imageId: number, updatedObjects: any[]) => {
  const response = await fetch(`${BASE_URL}/images/${imageId}`);
  const image = await response.json();

  const updateResponse = await fetch(`${BASE_URL}/images/${imageId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...image, objects: updatedObjects }),
  });

  return updateResponse.json();
};

export const deleteObject = async (imageId: number, objectId: string) => {
  const response = await fetch(`${BASE_URL}/images/${imageId}`);
  const image = await response.json();

  const updatedObjects = image.objects.filter(
    (obj: any) => obj.id !== objectId
  );

  const updateResponse = await fetch(`${BASE_URL}/images/${imageId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...image, objects: updatedObjects }),
  });

  return updateResponse.json();
};
