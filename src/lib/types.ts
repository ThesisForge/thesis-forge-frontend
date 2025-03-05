export interface Thesis {
    id: string
    topicName: string
    mainArea: string
    secondaryArea: string
    personalInterest: number
    businessPotential: number
    openSourceContribution: number
    scientificValue: number
    topicDescription: string
    externalLinks: string
  }
  
  export interface ThesisFormData {
    topicName: string
    mainArea: string
    secondaryArea: string
    personalInterest: number
    businessPotential: number
    openSourceContribution: number
    scientificValue: number
    topicDescription: string
    externalLinks: string
  }
  
  export type User = {
    id: string
    first_name: string
    last_name: string
    email: string
    image?: string
  }
  