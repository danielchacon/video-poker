import './button.scss';

interface Props {
    theme?: string;
    pressed?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    onClickCallback: () => void;
}

export const Button = (props: Props) => {
    const { children, pressed, disabled, theme, onClickCallback } = props;

    return (
        <button
            className={`button ${pressed && 'button--pressed'} button--theme-${
                theme ? theme : 'default'
            }`}
            type="button"
            disabled={disabled}
            onClick={onClickCallback}
        >
            {children}
        </button>
    );
};
