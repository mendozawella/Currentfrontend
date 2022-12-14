import { useRouter } from "next/router";
import { Card } from "semantic-ui-react";
import { Task } from "src/interfaces/Tasks";

interface Props {
  tasks: Task[];
}

export const TaskList = ({ tasks = [] }: Props) => {
  const router = useRouter();

  return (
    <Card.Group itemsPerRow={4}>
      {tasks.map((task) => (
        <Card
          onClick={() => router.push(`/tasks/edit/${task.id}`)}
          key={task.id}
        >
          <Card.Content>
            <Card.Header>{task.itemnumber}</Card.Header>
            {task.created_on && (
              <Card.Meta>
                {new Date(task.created_on).toLocaleDateString()}
              </Card.Meta>
            )}
            <Card.Description>{task.assetname}</Card.Description>
            <Card.Description>Borrower'sname: {task.borrowersname}</Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};
