const PORT = 3001;

const users = [
    { id: 123, name: "Chalysta Setyani", email: "chalysta@student.untan.ac.id" }
];

const products = [
    { id: 1, name: "Laptop", price: 15000000 },
    { id: 2, name: "Mouse", price: 250000 }
];

const server = Bun.serve({
    port: PORT,
    fetch(req) {
        const url = new URL(req.url);
        const path = url.pathname;
        const method = req.method;

        // --- LATIHAN 3: Middleware Log Waktu Eksekusi ---
        const start = Date.now();
        const getDuration = () => `${Date.now() - start}ms`;

        // --- ROUTING UTAMA ---
        if (path === "/" && method === "GET") {
            console.log(`[LOG] ${method} ${path} - ${getDuration()}`);
            return new Response("Selamat Datang di Bun Home - Chalysta Setyani");
        }

        if (path === "/about" && method === "GET") {
            console.log(`[LOG] ${method} ${path} - ${getDuration()}`);
            return new Response("Halaman About: Praktikum Routing Bun.js");
        }

        if (path === "/api/users" && method === "GET") {
            console.log(`[LOG] ${method} ${path} - ${getDuration()}`);
            return new Response(JSON.stringify(users), {
                headers: { "Content-Type": "application/json" }
            });
        }

        // --- LATIHAN 1: Route Products (GET & POST) ---
        if (path === "/products" && method === "GET") {
            console.log(`[LOG] ${method} ${path} - ${getDuration()}`);
            return new Response(JSON.stringify(products), {
                headers: { "Content-Type": "application/json" }
            });
        }
        if (path === "/products" && method === "POST") {
            console.log(`[LOG] ${method} ${path} - ${getDuration()}`);
            return new Response(JSON.stringify({ message: "Produk berhasil ditambahkan oleh Chalysta Setyani" }), {
                status: 201,
                headers: { "Content-Type": "application/json" }
            });
        }

        // --- LATIHAN 2: Parameter Dinamis /users/:id ---
        if (path.startsWith("/users/")) {
            const idStr = path.split("/")[2];
            const id = parseInt(idStr || "0");
            const user = users.find(u => u.id === id);

            console.log(`[LOG] ${method} ${path} - ${getDuration()}`);
            if (user) {
                return new Response(JSON.stringify(user), {
                    headers: { "Content-Type": "application/json" }
                });
            } else {
                return new Response(JSON.stringify({ error: "User tidak ditemukan" }), {
                    status: 404,
                    headers: { "Content-Type": "application/json" }
                });
            }
        }

        // Handle 404
        console.log(`[LOG] ${method} ${path} - ${getDuration()}`);
        return new Response("Halaman tidak ditemukan", { status: 404 });
    },
});

console.log(`🚀 Server Bun berjalan di http://localhost:${PORT}`);