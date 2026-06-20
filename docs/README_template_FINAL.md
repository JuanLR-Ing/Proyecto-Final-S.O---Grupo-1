# Proyecto Final — Arquitecto Cloud
**Sistemas Operativos 750001C | Semestre 3 – 2026**
**Universidad del Valle**

---

## Equipo

| Nombre | Código | Rol |
|--------|--------|-----|
| Alejandro Borrero | 202560904 | Virtualización |
| Juan José Lozano | 2560998 | Docker |
| Camila mallama | 2560968 | Kubernetes |
| Nombre 4 | 20XXXXXX | Sitio Web + Documentación |

**Grupo asignado:** Grupo 1
**Distribución gráfica:** Ubuntu 24.04 LTS  
**Distribución consola:** Debian 13.5 
**Imagen Docker base:** ubuntu:24.0
---

## Componente 1: Virtualización con Linux

**Distribuciones instaladas:** VM Gráfica + VM Consola  
**Herramienta:** VirtualBox / VMware

### Evidencias

#### Particionado Ubuntu

![Particionado Ubuntu](Particionado-Ubuntu.jpeg)

#### Particionado Debian

![Particionado Debian](Particionado-Debian.jpeg)

#### Configuración de red

![Configuración de red](ip-debian.jpeg)

#### Conexión SSH

![SSH funcional](ssh-conexion.jpeg)

### Comandos principales
```bash
ip a                          # Ver interfaces de red
lsblk                         # Ver particiones
ssh usuario@ip_vm_consola     # Conectar por SSH
```

---

## Componente 2: Contenedores Docker

**Servicios implementados:**
- Frontend: Nginx sirviendo HTML estático (puerto 80)
- Backend: Python HTTP (puerto 5000)

### Estructura de archivos
```
docker/
├── frontend/
│   ├── Dockerfile.frontend
│   └── index.html
├── backend/
│   ├── Dockerfile.backend
│   └── server.py
└── docker-compose.yml
```

### Evidencias
- Captura `docker compose up -d`
- Captura navegador accediendo al frontend
- Captura `curl http://localhost:5000`

### Comandos principales
```bash
docker compose up -d
docker ps
docker images
curl http://localhost
curl http://localhost:5000
```

---

## Componente 3: Orquestación con Kubernetes

**Herramienta:** Minikube

### Manifiestos
- `deployment.yaml` — Nginx con 2 réplicas
- `service.yaml` — NodePort en puerto 30080

### Evidencias
- Captura `kubectl get pods`
- Captura `kubectl get svc`
- Captura acceso desde navegador
- Captura escalado a 3 réplicas

### Comandos principales
```bash
minikube start
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl get pods
kubectl scale deployment nginx --replicas=3
minikube service nginx --url
```

---

## Componente 4: Sitio Web de Documentación

**URL del sitio:** [https://juanlr-ing.github.io/Proyecto-Final-S.O---Grupo-1/]  
**Video YouTube:** [https://docs.google.com/document/d/1znGM8lgpjpGu7HLbOfmS4dKsGPz6wJAv_VedR7is1nE/edit?tab=t.0] 

### Secciones del sitio
- Home: introducción y objetivos
- Equipo: integrantes con fotos y roles
- Componentes: descripción, capturas y comandos de cada uno
- Conclusiones: aprendizajes, dificultades y recomendaciones

---

## Diagrama de Arquitectura

> Insertar imagen del diagrama (draw.io / Miro / Lucidchart)

---

## Conclusiones

1. [Aprendizaje principal]
2. [Dificultad encontrada y cómo se resolvió]
3. [Recomendación para futuros proyectos]

---

*Proyecto desarrollado para la asignatura Sistemas Operativos 750001C — Semestre 1, 2026*
