import { Fragment } from "react/jsx-runtime";

interface PageProps{
    pageTitle: string;
    pageDescription: string;
}

export function PageHeadliner ({pageTitle, pageDescription} : PageProps) {
    return(
        <Fragment>
            <div className="flex flex-col gap-1.5 w-1/4">
                <h1 className="text-black font-sans text-2xl tracking-[-.0375rem] font-bold">
                    {pageTitle}
                </h1>
                <h2 className="text-[#71717A] font-sans text-sm">
                    {pageDescription}
                </h2>
            </div>
        </Fragment>
    )
}