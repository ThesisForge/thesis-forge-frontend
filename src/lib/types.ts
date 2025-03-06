export interface Thesis {
    _id: string
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
    secondaryArea?: string
    personalInterest: number
    businessPotential: number
    openSourceContribution: number
    scientificValue: number
    topicDescription: string
    externalLinks?: string
  }
  
  export type User = {
    _id: string
    first_name: string
    last_name: string
    email: string
    image?: string
  }
  