# Node R Lambda

Use [AWS Lambda](https://aws.amazon.com/lambda/) to run node scripts.

## Execution
Follow these steps to get started:

1. Git-clone this repository.

        $ git clone git@github.com:ocelotconsulting/node-R-lambda.git

2. Package lambda zip:

        $ npm run dist

3. Create lambda by uploading zip, and establish your desired trigger (i.e. periodic).
