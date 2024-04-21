import {
	type ReactNode,
	type Dispatch,
	type SetStateAction,
	createContext,
	useContext,
} from 'react';

interface IProps {
	globalData: unknown;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setGlobalData: ((arg0: unknown) => void) | Dispatch<SetStateAction<any>>;
}

const GlobalDataContext = createContext<IProps>({
	globalData: [],
	setGlobalData: () => {},
});

export const DataProvider = ({
	children,
	globalData,
	setGlobalData,
}: IProps & { children: ReactNode }) => {
	return (
		<GlobalDataContext.Provider value={{ globalData, setGlobalData }}>
			{children}
		</GlobalDataContext.Provider>
	);
};

export const useGlobalData = () => useContext(GlobalDataContext);
