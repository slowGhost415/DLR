"""
Main script para executar todo o sistema web de economia.
Inicia o backend (Node.js/Express) e frontend (React/Vite) simultaneamente.
Compatível com Windows e caminhos com espaços.
"""

import subprocess
import sys
import os
import time
import signal

def check_command(command, name):
    """Verifica se um comando está disponível."""
    try:
        # Para Windows, tentar diferentes formas
        if os.name == 'nt':
            # Para Node.js e npm, usar caminho absoluto
            if command == 'node':
                cmd_to_try = r'C:\Program Files\nodejs\node.exe'
                result = subprocess.run([cmd_to_try, '--version'], capture_output=True, text=True, timeout=10)
                if result.returncode == 0:
                    print(f"✅ {name} encontrado")
                    return True
            elif command == 'npm':
                cmd_to_try = r'C:\Program Files\nodejs\npm.cmd'
                result = subprocess.run([cmd_to_try, '--version'], capture_output=True, text=True, timeout=10)
                if result.returncode == 0:
                    print(f"✅ {name} encontrado")
                    return True
            # Para outros comandos, tentar normal
            result = subprocess.run([command, '--version'], capture_output=True, text=True, timeout=10)
            if result.returncode == 0:
                print(f"✅ {name} encontrado")
                return True
        else:
            # Para outros sistemas
            result = subprocess.run([command, '--version'], capture_output=True, text=True, timeout=10)
            if result.returncode == 0:
                print(f"✅ {name} encontrado")
                return True

        print(f"❌ {name} não encontrado!")
        return False
    except (subprocess.CalledProcessError, FileNotFoundError, subprocess.TimeoutExpired):
        print(f"❌ {name} não encontrado!")
        return False

def run_command(cmd, cwd=None):
    """Executa um comando."""
    try:
        # Para Windows, usar shell=True e caminhos absolutos para Node.js
        if os.name == 'nt':
            # Substituir 'npm ' pelo caminho absoluto com PATH correto
            if cmd.startswith('npm '):
                # Usar PROGRA~1 para evitar espaços em paths Windows
                cmd = cmd.replace('npm ', 'C:\\PROGRA~1\\Nodejs\\npm.cmd ', 1)

        env = os.environ.copy()
        if os.name == 'nt':
            env['PATH'] = env.get('PATH', '') + ';C:\\Program Files\\nodejs'
        
        # Para subprocess no Windows, usar shell=True e criar novo grupo de processos
        if os.name == 'nt':
            return subprocess.Popen(
                cmd, 
                shell=True, 
                cwd=cwd, 
                env=env,
                creationflags=subprocess.CREATE_NEW_PROCESS_GROUP if hasattr(subprocess, 'CREATE_NEW_PROCESS_GROUP') else 0
            )
        else:
            return subprocess.Popen(cmd, shell=True, cwd=cwd, env=env)
    except Exception as e:
        print(f"Erro ao executar comando '{cmd}': {e}")
        return None

def main():
    print("🚀 Iniciando sistema completo de economia...")
    print(f"📁 Diretório do projeto: {os.getcwd()}")
    print()

    # Limpar processos Node.js anteriores
    print("🔴 Limpando processos Node.js anteriores...")
    try:
        if os.name == 'nt':
            os.system('taskkill /F /IM node.exe /T 2>nul')
        time.sleep(2)
    except:
        pass

    print()

    # Verificar dependências
    print("🔍 Verificando dependências...")

    node_ok = check_command('node', 'Node.js')
    npm_ok = check_command('npm', 'npm')
    python_ok = check_command('python', 'Python')

    if not node_ok:
        print("📥 Execute instalação do Node.js em: https://nodejs.org/")
        sys.exit(1)

    if not npm_ok:
        print("❌ npm não encontrado")
        sys.exit(1)

    if not python_ok:
        print("📥 Instale Python em: https://python.org/")
        sys.exit(1)

    print()

    # Caminhos absolutos
    project_dir = os.path.abspath(os.getcwd())
    backend_dir = os.path.join(project_dir, 'backend')
    frontend_dir = os.path.join(project_dir, 'frontend')

    # Verificar diretórios
    if not os.path.exists(backend_dir):
        print(f"❌ Diretório 'backend' não encontrado: {backend_dir}")
        sys.exit(1)

    if not os.path.exists(frontend_dir):
        print(f"❌ Diretório 'frontend' não encontrado: {frontend_dir}")
        sys.exit(1)

    print("📁 Estrutura verificada com sucesso")
    print()

    # Iniciar backend
    print("📡 Iniciando backend (Express)...")
    backend_process = run_command('npm run dev', cwd=backend_dir)

    if backend_process is None:
        print("❌ Falha ao iniciar backend!")
        sys.exit(1)

    # Aguardar backend iniciar
    print("⏳ Aguardando backend iniciar (10 segundos)...")
    time.sleep(10)

    # Iniciar frontend
    print("🌐 Iniciando frontend (Vite)...")
    frontend_process = run_command('npm run dev', cwd=frontend_dir)

    if frontend_process is None:
        print("❌ Falha ao iniciar frontend!")
        backend_process.terminate()
        sys.exit(1)

    print()
    print("✅ Sistema iniciado com sucesso!")
    print("📍 Backend:  http://localhost:4000")
    print("📍 Frontend: http://localhost:5173")
    print()
    print("💡 Pressione Ctrl+C para parar tudo...")
    print()

    # Manter processos rodando
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n🛑 Encerrando sistema...")

        # Terminar processos
        backend_process.terminate()
        frontend_process.terminate()

        # Aguardar finalização
        try:
            backend_process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            backend_process.kill()

        try:
            frontend_process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            frontend_process.kill()

        print("✅ Sistema encerrado!")

if __name__ == "__main__":
    main()