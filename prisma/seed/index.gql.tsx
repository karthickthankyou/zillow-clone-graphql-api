import { gql } from 'graphql-request'

export const CreateSeller = gql`
  mutation CreateSeller($createSellerInput: CreateSellerInput!) {
    createSeller(createSellerInput: $createSellerInput) {
      uid
    }
  }
`

export const CreateBuyer = gql`
  mutation CreateBuyer($createBuyerInput: CreateBuyerInput!) {
    createBuyer(createBuyerInput: $createBuyerInput) {
      uid
    }
  }
`

export const CreateAgent = gql`
  mutation CreateAgent($createAgentInput: CreateAgentInput!) {
    createAgent(createAgentInput: $createAgentInput) {
      uid
    }
  }
`

export const CreateProperty = gql`
  mutation CreateProperty($createPropertyInput: CreatePropertyInput!) {
    createProperty(createPropertyInput: $createPropertyInput) {
      id
    }
  }
`

export const CreateLocationStats = gql`
  mutation CreateLocationStats(
    $createLocationStatsInput: CreateLocationStatsInput!
  ) {
    createLocationStats(createLocationStatsInput: $createLocationStatsInput) {
      id
    }
  }
`
