# Infrustructure

## Dependencies

- [AWS CLI](http://docs.aws.amazon.com/cli/latest/userguide/installing.html#install-with-pip)
- [AWS credentials](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
- [Terraform](https://www.terraform.io/intro/getting-started/install.html)

## Lock table

The lock table should already exist. For whatever reason that we're starting afresh, you can recreate this in the [`terraform-config`](terraform-config) and running `terraform apply`

## Setup

We'll need to have the backend setup for the remote state.
To do this run [`./setup.sh`](setup.sh)

# Deploying a build

    `./deploy.py`

You should then be prompted to deploy the latest tag from the [Docker Registry](https://registry.hub.docker.com/v2/repositories/wellcome/wellcomecollection/tags/).

If you'd like to commit a specific tag,
you can use the [`./apply_task_definition.sh <CONTAINER_TAG>`](apply_task_definition.sh).


# Deploying infrastructure changes
```bash
  # to check your changes
  ./plan.sh <dev|prod> <DOCKER_TAG>

  # to deploy your changes
  ./apply.sh <dev|prod> <DOCKER_TAG>
```

`DOCKER_TAG`s can be found on [Docker Hub](https://hub.docker.com/r/wellcome/wellcomecollection/tags/).
