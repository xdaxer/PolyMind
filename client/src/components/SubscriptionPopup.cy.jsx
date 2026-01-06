import React from 'react'
import SubscriptionPopup from './SubscriptionPopup'

describe('<SubscriptionPopup />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SubscriptionPopup />)
  })
})