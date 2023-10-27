variable "task_definition" {
  description = "The task definition resource that is created by the byo-ecs module"
}

variable "ecs_service" {
  description = "The ecs service resource that is created by the byo-ecs module"
}

variable "ecs_cluster" {
  description = "The ecs cluster module that is created by the byo-db module"
}

variable "execution_iam_role_arn" {
  description = "The ARN of the fleet execution role, this is necessary to pass role from ecs events"
}

variable "vuln_processing_memory" {
  // note must conform to FARGATE breakpoints https://docs.aws.amazon.com/AmazonECS/latest/userguide/fargate-task-defs.html
  default = 4096
  description = "The amount of memory to dedicate to the vuln processing command"
}

variable "vuln_processing_cpu" {
  // note must conform to FARGETE breakpoints https://docs.aws.amazon.com/AmazonECS/latest/userguide/fargate-task-defs.html
  default = 1024
  description = "The amount of CPU to dedicate to the vuln processing command"
}
