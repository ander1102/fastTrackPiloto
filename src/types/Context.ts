export interface ContextProps<IEntity> {
  filter: IEntity;
  onChange: <IKey extends keyof IEntity>(
    key: IKey,
    newValue: IEntity[IKey]
  ) => void;
}
