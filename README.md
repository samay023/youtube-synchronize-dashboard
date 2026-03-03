This is a Youtube sync dashboard which leverage Youtube Data API v3 and Google PubSubHubBub (push): https://pubsubhubbub.appspot.com/ to sync a video metadata into the database. This reference to the embed link is also stored, so it helps with playing any of the videos already synced easily.

## Getting Started

First, run the development server:

```bash
yarn install
yarn setup
yarn generate
yarn migrate
yarn dev

```

And ensure the necessary environment variables are set.

### Deployment

`Install terraform to create the required architecture`

This project uses terraform to create an ec2 instance with a ssh key

This will later be updated to use github actions to package and download the image in ec2 instance
