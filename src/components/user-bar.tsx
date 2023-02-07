interface Props {
    balance: number;
}

export const UserBar = (props: Props) => {
    return <div>На счету: {props.balance}$</div>;
};
