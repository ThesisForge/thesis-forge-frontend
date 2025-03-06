import { Thesis, ThesisFormData } from "@/lib/types";
import { THESIS_URL } from "@/lib/urls";

export const fetchUserTheses = async (token: string): Promise<Thesis[]> => {
  const resp = await fetch(`${THESIS_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data: Thesis[] = await resp.json();
  return data;
};

export const getThesis = async (thesisId: string, token: string): Promise<Thesis> => {
  const resp = await fetch(`${THESIS_URL}/${thesisId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data: Thesis = await resp.json();
  return data;
}

export const postThesis = async (thesisData: ThesisFormData, token: string, userId: string): Promise<Thesis> => {
  const postBody = {
    topic_name: thesisData.topicName,
    main_area: thesisData.mainArea,
    secondary_area: thesisData.secondaryArea,
    personal_interest: thesisData.personalInterest,
    business_potential: thesisData.businessPotential,
    open_source_contribution: thesisData.openSourceContribution,
    scientific_value: thesisData.scientificValue,
    topic_description: thesisData.topicDescription,
    external_links: thesisData.externalLinks,
    user_id: userId,
  }
  const resp = await fetch(`${THESIS_URL}/`, {
    method: "POST",
    body: JSON.stringify(postBody),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });
  if (!resp.ok) {
    const errors = await resp.json()
    console.error(errors)
    throw Error(errors)
  }
  const data: Thesis = await resp.json();
  return data;
}