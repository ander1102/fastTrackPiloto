import  { PropsWithChildren, HTMLAttributes,ReactNode } from "react";

interface PageContainerProps
  extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
  header?: ReactNode;
  body?: ReactNode;
}

export function PageContainer(props: PageContainerProps) {
  if (props.header && props.body) {
    return (
      <article {...props} className="page-container">
        <HeaderContainer>{props.header}</HeaderContainer>
        <BodyContainer>{props.body}</BodyContainer>
      </article>
    );
  }
  return (
    <article {...props} className="page-container">
      {props.children}
    </article>
  );
}

export function HeaderContainer({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <header {...props} className="header-container">
      {children}
    </header>
  );
}

export function BodyContainer({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <main {...props} className="main-container">
      {children}
    </main>
  );
}

export function TableContainer({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <>
      {/* @ts-ignore*/}
      <section {...props} className="table-container">
        {children}
        {/* @ts-ignore*/}
      </section>
    </>
  );
}

export function TabHeaderContainer({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <header {...props} className="tab-header-container">
      {children}
    </header>
  );
}
export function TabBodyContainer({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <main {...props} className="tab-main-container">
      {children}
    </main>
  );
}

