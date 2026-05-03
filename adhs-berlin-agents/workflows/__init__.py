from typing import Callable, TYPE_CHECKING

if TYPE_CHECKING:
    from orchestrator import WorkflowResult

from . import newsletter_workflow, feature_workflow, blog_workflow, chatbot_workflow

# Registry: CLI-Name → Workflow-Funktion
WORKFLOW_REGISTRY: dict[str, Callable] = {
    "newsletter": newsletter_workflow.run,
    "feature": feature_workflow.run,
    "blog": blog_workflow.run,
    "chatbot": chatbot_workflow.run,
}

__all__ = ["WORKFLOW_REGISTRY"]
