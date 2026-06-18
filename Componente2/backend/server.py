from http.server import HTTPServer, BaseHTTPRequestHandler
import json

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            body = {"mensaje": "Backend Python activo", "ruta": "/", "status": "ok"}
        elif self.path == '/salud':
            body = {"status": "ok"}
        else:
            body = {"error": "ruta no encontrada", "ruta": self.path}

        data = json.dumps(body).encode()
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(data)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(data)

    def log_message(self, fmt, *args):
        print(f"[{self.address_string()}] {fmt % args}")

if __name__ == '__main__':
    server = HTTPServer(('0.0.0.0', 5000), Handler)
    print("Backend corriendo en http://0.0.0.0:5000")
    server.serve_forever()
