
const fs = require("node:fs/promises");
const path = require("node:path");
const { spawn } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const port = 43821;
const baseUrl = `http://127.0.0.1:${port}`;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function waitForServer() {
    for (let i = 0; i < 60; i++) {
        try {
            const response = await fetch(baseUrl);
            if (response.ok) return;
        } catch {}
        await sleep(250);
    }
    throw new Error("El servidor no inició correctamente");
}

async function savePage(url, output) {
    const response = await fetch(baseUrl + url);

    if (!response.ok) {
        throw new Error(`Error ${response.status} en ${url}`);
    }

    const html = await response.text();
    const destination = path.join(dist, output);

    await fs.mkdir(path.dirname(destination), {
        recursive: true
    });

    await fs.writeFile(destination, html);
    console.log(`Generado: ${output}`);
}

async function build() {
    await fs.rm(dist, { recursive: true, force: true });

    await fs.cp(path.join(root, "public"), dist, {
        recursive: true
    });

    const server = spawn(process.execPath, ["index.js"], {
        cwd: root,
        env: { ...process.env, PORT: String(port) },
        stdio: "inherit"
    });

    try {
        await waitForServer();

        // Página principal
        await savePage("/?lang=es", "index.html");

        // Presentaciones definidas en archivos JSON
        const presentations = path.join(
            root, "data", "presentations"
        );

        const files = await fs.readdir(presentations);

        for (const file of files) {
            if (!file.endsWith(".json")) continue;

            const id = path.basename(file, ".json");

            await savePage(
                `/presentation/${encodeURIComponent(id)}`,
                `presentation/${id}/index.html`
            );
        }

        // Archivos SEO
        for (const file of ["robots.txt", "sitemap.xml"]) {
            await fs.copyFile(
                path.join(root, file),
                path.join(dist, file)
            );
        }

        await fs.writeFile(
            path.join(dist, ".nojekyll"),
            ""
        );

        console.log("Build completado.");
    } finally {
        server.kill();
    }
}

build().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
