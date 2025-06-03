import {components} from "@/data-domain/schema";

export function runtimeToString(runtime: components["schemas"]["Runtime"]): string {
    let string = runtime.hours.toFixed(0).padStart(2, "0") + ":";
    string += runtime.minutes.toFixed(0).padStart(2, "0") + ":";
    string += runtime.seconds.toFixed(0).padStart(2, "0");
    string += "." + runtime.milliseconds.toFixed(0).padStart(3, "0");
    return string;
}