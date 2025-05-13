# React Coding Rules

## Folder structure

Always Write component inside ./src/widgets folder

Always write props with this pattern

```ts
interface NewComponentProps {
	children: React.ReactNode;
}

const NewComponent = (props: NewComponentProps) => {
	const { children } = props;
	return (
		<div>
			<div>Hello world</div>
		</div>
	);
};

export default NewComponent;
```