import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

interface ProviderReduxProps {
	children: ReactNode;
}

const ReduxProvider: FC<ProviderReduxProps> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
