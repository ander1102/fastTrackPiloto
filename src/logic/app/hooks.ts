import { ContextManagerProps, Controller } from "@app/types";
import { execWithLoader } from "@app/utils/DOM";

export const execCall = async <
  IController extends Controller,
  IKey extends keyof IController,
  IParameters extends Parameters<IController[IKey]>
>(
  func: IController[IKey],
  args: IParameters,
  options?: Partial<ContextManagerProps>
) =>
  options?.loader
    ? await execWithLoader(func, args, options.context, options.delay)
    : await func(...args);
