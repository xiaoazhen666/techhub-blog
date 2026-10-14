"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiLogin, apiRegister } from "@/lib/api";

function LoginContent() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";

  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!username.trim() || !password.trim()) {
      setError("请填写用户名和密码");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data =
        mode === "login"
          ? await apiLogin({ username: username.trim(), password })
          : await apiRegister({ username: username.trim(), password, nickname: nickname.trim() || undefined });

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: data.userId,
          username: data.username,
          nickname: data.nickname,
          avatar: data.avatar,
        })
      );
      router.push(redirect);
    } catch (e: any) {
      setError(e.message || "操作失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-layout mt-16 flex justify-center">
      <div className="card p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {mode === "login" ? "登录 TechHub" : "注册 TechHub"}
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded-md text-sm bg-red-50 text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">用户名</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="用户名（3-20 位）"
              className="w-full rounded-md border p-3 text-sm outline-none transition-colors focus:border-brand"
              style={{ backgroundColor: "var(--hover)", borderColor: "var(--border)", color: "var(--text)" }}
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="text-sm font-medium mb-2 block">昵称（可选）</label>
              <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="给自己起个好听的昵称"
                className="w-full rounded-md border p-3 text-sm outline-none transition-colors focus:border-brand"
                style={{ backgroundColor: "var(--hover)", borderColor: "var(--border)", color: "var(--text)" }}
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-2 block">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="密码（6-30 位）"
              onKeyDown={(e) => e.key === "Enter" && submit()}
              className="w-full rounded-md border p-3 text-sm outline-none transition-colors focus:border-brand"
              style={{ backgroundColor: "var(--hover)", borderColor: "var(--border)", color: "var(--text)" }}
            />
          </div>

          <button onClick={submit} disabled={loading} className="btn-primary w-full py-2.5">
            {loading ? "处理中..." : mode === "login" ? "登录" : "注册"}
          </button>

          <div className="text-center text-sm" style={{ color: "var(--text-secondary)" }}>
            {mode === "login" ? (
              <>
                还没有账号？{" "}
                <button className="text-brand hover:underline" onClick={() => { setMode("register"); setError(""); }}>
                  去注册
                </button>
              </>
            ) : (
              <>
                已有账号？{" "}
                <button className="text-brand hover:underline" onClick={() => { setMode("login"); setError(""); }}>
                  去登录
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t text-xs text-center" style={{ borderColor: "var(--border)", color: "var(--text-tertiary)" }}>
          测试账号：admin / admin123
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="container-layout mt-16 text-center">加载中...</div>}>
      <LoginContent />
    </Suspense>
  );
}
