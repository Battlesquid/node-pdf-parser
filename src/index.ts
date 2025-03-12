import pino from "pino";

const hello = (): void => {
    const logger = pino();
    logger.info("Hello World");
};

hello();