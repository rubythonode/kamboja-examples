import { Core } from "kamboja-express"
import { container } from "./plumbing"

export class InversifyDependencyResolver implements Core.DependencyResolver {
    resolve<T>(qualifiedClassName: string): any {
        return container.get(qualifiedClassName)
    }
}