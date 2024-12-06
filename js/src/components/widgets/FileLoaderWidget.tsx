import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import { FileLoader } from "../ui/FileLoader";
import '../../css/styles.css';

function FileLoaderWidget() {
    const [uiLabel] = useModelState<string>("ui_label");
    const [uiTooltip] = useModelState<string>("ui_tooltip");
    const [accept] = useModelState<string>("accept");
    const [, setFileContent] = useModelState<Uint8Array | null>("file_content");
    const [, setFilename] = useModelState<string | null>("filename");
    const [, setEncoding] = useModelState<string>("encoding");

    const handleFileLoad = (content: Uint8Array, filename: string, encoding: string) => {
        console.log("FileLoaderWidget");
        console.log(filename);
        console.log(encoding);
        console.log(content);
        setFileContent(content);
        setFilename(filename);
        setEncoding(encoding);
    };

    return (
        <FileLoader
            uiLabel={uiLabel}
            uiTooltip={uiTooltip}
            accept={accept}
            onFileLoad={handleFileLoad}
        />
    );
}

export default {
    render: createRender(FileLoaderWidget)
}