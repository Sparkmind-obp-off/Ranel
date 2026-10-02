# Privacy and Security Baseline

This is a planning baseline, not legal advice or proof of compliance. Review Indonesian law and applicable obligations before processing customer data at scale.

## Data minimization
Collect only information required to deliver the specific product. Avoid sensitive personal data unless essential, lawful, and appropriately protected.

## Consent and communication
Explain why customer information is collected. Obtain appropriate permission before marketing or reminder messages. Provide a simple way to stop non-essential messages. Do not buy, scrape, or import contact lists without a lawful basis and appropriate permissions.

## Access and storage
Give access only to people who need it. Use unique accounts and MFA where available. Remove access when roles end. Document what is stored, why, where, who can access it, and when it is deleted. Review provider terms. Avoid storing payment-card data; use a suitable payment provider. Protect backups and test restoration.

## Development
Store secrets in environment/secret managers. Keep environment files and customer exports out of Git. Review dependencies and permissions. Use synthetic data in demos. Avoid logging full customer messages or unnecessary identifiers.

## Incident response
Maintain a response plan. Contain exposure quickly, assess affected data, preserve necessary evidence securely, and seek qualified advice on notification obligations.

## Checklist
- [ ] Data inventory exists.
- [ ] Purpose and lawful basis documented.
- [ ] Privacy notice drafted where needed.
- [ ] Consent and opt-out process documented.
- [ ] Retention/deletion rules defined.
- [ ] Vendor terms reviewed.
- [ ] Access and incident procedures assigned.
